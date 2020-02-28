var templates = {}

templates['Canonical'] = `---
schema:     {{schema}}
vnf:        {{vnf}}
version:    {{version}}
tenant:
  name:          "{{tenant.name}}"
  prefix:        "{{tenant.prefix}}"
  auth:
    username:    "{{tenant.auth.username}}"
    password:    "{{tenant.auth.password}}"
    url:         "{{tenant.auth.url}}"
flavors:
{% for flavor in flavors %}
  - uuid:    "{{flavor.uuid}}"
    name:    "{{flavor.name}}"
    vcpu:    {{flavor.vcpu}}
    ram:     {{flavor.ram}}
    disk:    {{flavor.disk}}
    public:  "{{flavor.public}}"
{% if flavor.special|length == 0 %}
    special: []
{% endif -%}
{% if flavor.special|length >  0 %}
    special:
{% endif -%}
{% for special in flavor.special %}
      - { key: "{{special.key}}", value: "{{special.value}}" }
{% endfor %}
{% endfor %}
images:
{% for image in images -%}
  - { uuid: "{{image.uuid}}",
      name: "{{image.name}}",
      version: "{{image.version}}",
      format: "{{image.format}}",
      container: "{{image.container}}",
      disk: "{{image.disk}}",
      size: "{{image.size}}",
      checksum: "{{image.checksum}}",
      url: "{{image.url}}",
      special: "{{image.special}}" }
{% endfor %}
networks:
{% for network in networks%}
  - uuid:      "{{network.uuid}}"
    name:      "{{network.name}}"
    external:  "{{network.external}}"
    ipv4:      "{{network.ipv4}}"
    ipv4gw:    "{{network.ipv4gw}}"
    ipv4start: "{{network.ipv4start}}"
    ipv4end:   "{{network.ipv4end}}"
    ipv6:      "{{network.ipv6}}"
    ipv6gw:    "{{network.ipv6gw}}"
    ipv6start: "{{network.ipv6start}}"
    ipv6end:   "{{network.ipv6end}}"
    route:     "{{network.route}}"
    export:    "{{network.export}}"
    import:    "{{network.import}}"
    special:   "{{network.special}}"
{% endfor %}
components:
{% for component in components %}
  - uuid:         "{{component.uuid}}"
    name:         "{{component.name}}"
    user:         "{{component.user}}"
    placement:    "{{component.placement}}"
    flavor:       "{{component.flavor}}"
    image:        "{{component.image}}"
    min:          {{component.min}}
    size:         {{component.size}}
    max:          {{component.max}}
{% if component.volumes|length == 0 %}
    volumes:      []
{% endif -%}
{% if component.volumes|length >  0 %}
    volumes:
{% endif -%}
{% for volume in component.volumes %}
      - { name: "{{volume.name}}", size: {{volume.size}}, type: "{{volume.type}}", attributes: "{{volume.attributes}}" }
{% endfor %}
{% if component.interfaces|length == 0 %}
    interfaces:   []
{% endif -%}
{% if component.interfaces|length >  0 %}
    interfaces:
{% endif -%}
{% for interface in component.interfaces %}
      - { network: "{{interface.network}}", attributes: "{{interface.attributes}}" }
{% endfor %}
{% if component.services|length == 0 %}
    services:     []
{% endif -%}
{% if component.services|length >  0 %}
    services:
{% endif -%}
{% for service in component.services %}
      - { name: "{{service.name}}", network: "{{service.network}}", protocol: "{{service.protocol}}", range: "{{service.range}}" }
{% endfor %}
{% if component.dependencies|length == 0 %}
    dependencies: []
{% endif -%}
{% if component.dependencies|length >  0 %}
    dependencies:
{% endif -%}
{% for dependency in component.dependencies %}
      - { component: "{{dependency.component}}", service: "{{dependency.service}}", network: "{{dependency.network}}" }
{% endfor %}
{% if component.userdata == "" %}
    userdata:     ""
{% endif -%}
{% if component.userdata != "" %}
    userdata: |
      {{ component.userdata | indent(6) | safe }}
{% endif -%}

{% endfor %}
`

//------------------------------------------------------------------------------

templates['Communication Matrix'] = `From                |Network |To                  |Service   |Protocol|Port (range)    |Network
{% for component1 in components %}{% for dependency in component1.dependencies %}
{% for component2 in components %}{% if component2.name == dependency.component %}
{% for service in component2.services %}{% if service.name == dependency.service %}
{{(component1.name    + '                    ') | truncate(20,false,'') }}|{{(dependency.network + '        ') | truncate(8,false,'') }}|{{(component2.name + '                    ') | truncate(20,false,'') }}|{{(service.name + '          ') | truncate(10,false,'') }}|{{(service.protocol + '        ') | truncate(8,false,'')  }}|{{(service.range      + '                ') | truncate(16,false,'') }}|{{(service.network    + '      ') | truncate(6,false,'')  }}
{% endif %}{% endfor %}
{% endif %}{% endfor %}
{% endfor %}{% endfor %}`

//------------------------------------------------------------------------------

templates['VNFds'] = `
[{% for component in components %}
{
  "vnfSoftwareVersion": "1.0",
  "vdus": [
    {
      "intCpd": [
        {% for network in networks %}
        "{{ network.name }}"{{ "," if not loop.last }}
        {% endfor %}
      ],
      "vduId": "small_fortios_vdu",
      "virtualComputeDesc": "fortios_small",
      "name": "FortiOS Small VDU",
      "swImageDesc": "fortios_qcow2"
    }
  ],
  "virtualComputeDescs": [
    {
      "virtualMemory": {
        "virtualMemSize": 1024
      },
      "virtualComputeDescId": "fortios_small",
      "virtualCpu": {
        "numVirtualCpu": 1
      }
    }
  ],
  "vduProfiles": [
    {
      "minNumberOfInstances": {{component.min}},
      "vduProfileId": "sm_fortios_vdu_profile",
      "maxNumberOfInstances": {{component.max}},
      "vduId": "small_fortios_vdu"
    }
  ],
  "softwareImages": [
    "fortios_qcow2"
  ],
  "vnfProvider": "Fortinet",
  "instantiationLevels": [
    {
      "levelId": "sm_level_1",
      "vduLevel": [
        {
          "vduLevelId": "sm_vdu_level_1",
          "numberOfInstances": 1,
          "vduId": "small_fortios_vdu"
        }
      ]
    }
  ],
  "vnfExtCpds": [{% for network in networks %}
    {
      "intCpd": "{{ network.name }}",
      "cpd": {
        "cpdId": "ext_{{ network.name }}"
      }
    }{{ "," if not loop.last }}{% endfor %}
  ],
  "vnfdVersion": "1.0",
  "intCpds": [{% for network in networks %}
    {
      "cpd": {
        "cpdId": "{{ network.name }}"
      }
    }{{ "," if not loop.last }}{% endfor %}
  ],
  "vnfProductInfoName": "Training FortiGate VNF",
  "deploymentFlavors": [
    {
      "vduProfile": [
        "sm_fortios_vdu_profile"
      ],
      "defaultInstantiationLevel": "sm_level_1",
      "vnfLcmOperationsConfiguration": {
        "scaleVnfOpConfig": {
          "scalingByMoreThanOneStepSupported": false
        }
      },
      "flavourId": "small",
      "instantiationLevel": [
        "sm_level_1"
      ]
    }
  ],
  "vnfdId": "{{component.name}}",
  "exportedModelVersion": "0.0.0",
  "vnfdOperationalState": "ENABLED",
  "vnfdProductName": "Training FortiOS VNF"
}{{ "," if not loop.last }}
{% endfor %}
]
`

//------------------------------------------------------------------------------

templates['NSds'] = `{
  "message": "placeholder for NSds generation"
}`
