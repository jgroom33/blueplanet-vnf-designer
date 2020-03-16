var test = {
  blah: {
    meh: "jlksjflkj"
  },
  gray: "001",
  foo() {
    this.gray = "002";
  },
  bar() {
    console.log("bar");
  },
  baz() {
    console.log("baz");
  }
};

export default test;
