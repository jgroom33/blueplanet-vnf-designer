import { MINIMAL_SCHEMA } from "js-yaml";

var misc = {
  // fixed_ips_filter derives a list of fixed IPs from a string
  // format: "fixed: IP1, IP2, IP3, ...;"
  // each IP? should either be an IP-address or a
  // range with the last octet defining the Range
  // e.g. 192.168.178.10-20
  fixed_ips_filter(str) {
    var pattern = /fixed:[^;]*/i;
    var result = [];

    // extract the fixed ips part of the string
    str1 = str.match(pattern);

    if (!str1) {
      return result;
    }

    // get first occurence
    str2 = str1[0];

    // remove the prefix: "fixed: "
    str3 = str2.substr(7);

    // split into substrings
    str4 = str3.split(",");

    // construct the result
    for (str5 of str4) {
      // check if we have a range
      if (str5.indexOf("-") < 0) {
        result.push(str5);
      } else {
        for (str6 of generate_ip_range(str5)) {
          result.push(str6);
        }
      }
    }

    // completed
    return result;
  },

  // allowed_ips_filter derives a list of allowed IPs from a string
  // format: "allowed: IP1, IP2, IP3, ...;"
  // each IP? should either be an IP-address or a
  // range with the last octet defining the Range
  // e.g. 192.168.178.10-20
  allowed_ips_filter(str) {
    var pattern = /allowed:[^;]*/i;
    var result = [];

    // extract the allowed ips part of the string
    str1 = str.match(pattern);

    if (!str1) {
      return result;
    }

    // get first occurence
    str2 = str1[0];

    // remove the prefix: "allowed: "
    str3 = str2.substr(9);

    // split into substrings
    str4 = str3.split(",");

    // construct the result
    for (str5 of str4) {
      // check if we have a range
      if (str5.indexOf("-") < 0) {
        result.push(str5);
      } else {
        for (str6 of generate_ip_range(str5)) {
          result.push(str6);
        }
      }
    }

    // completed
    return result;
  },

  // port_min_filter derives a min port number from a string
  // format: "portmin-portmax|port"
  // e.g. 8080-8081
  port_min_filter(str) {
    parts = str.split("-");

    return parts.length == 2 ? parts[0] : str;
  },

  // port_max_filter derives a max port number from a string
  // format: "portmin-portmax|port"
  // e.g. 8080-8081
  port_max_filter(str) {
    parts = str.split("-");

    return parts.length == 2 ? parts[1] : str;
  },

  // generate_ip_range generates a list of IP addresses as an array
  generate_ip_range(range) {
    var result = [];

    // split range and determine prefix and range
    pos = range.lastIndexOf(".");
    prefix = range.substr(0, pos);
    rng = range.substr(pos + 1);

    // split the range and determine first and last index
    parts = rng.split("-");
    first = parseInt(parts[0], 10);
    last = parseInt(parts[1], 10);

    // construct the result
    for (var index = first; index <= last; index++) {
      result.push(prefix + "." + index);
    }

    // completed
    return result;
  },

  // empty model returns an empty model
  emptyModel() {
    return {
      vnf: "",
      version: "",
      tenant: {
        name: "",
        auth: {
          username: "",
          password: "",
          url: ""
        }
      },
      flavors: [],
      images: [],
      networks: [],
      components: []
    };
  },

  // render a model into a template
  render(model, template_name) {
    var tmpl = templates[template_name];
    var env = nunjucks.configure({ trimBlocks: true });

    env.addFilter("fixed", fixed_ips_filter);
    env.addFilter("allowed", allowed_ips_filter);
    env.addFilter("portmin", port_min_filter);
    env.addFilter("portmax", port_max_filter);

    return nunjucks.renderString(tmpl, model);
  },

  // splitter splits up a txt along seperator lines
  // of the form "----- filename -----" and returns
  // a dictionary with the filenames as keys
  splitter(txt) {
    var result = {};
    var content = "";
    var lines = txt.split("\n");
    var filename = "";

    // loop over all lines
    for (const line of lines) {
      seperator = line.match("----- .* -----");
      if (seperator && seperator[0] == line) {
        // store current content
        if (filename != "" && content != "") {
          result[filename] = content;
        }
        // determine new filename
        seperator = seperator[0];
        filename = seperator.substring(6, seperator.length - 6);
        content = "";
      } else {
        if (content != "") {
          content += "\n" + line;
        } else {
          content = line;
        }
      }
    }

    // store remaining content
    if (filename != "" && content != "") {
      result[filename] = content;
    }

    // completed
    return result;
  }
};

export default misc;
