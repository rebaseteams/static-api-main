const setPoll = (fn, time:number) => {
  fn();
  setInterval(() => {
    fn();
  }, time);
};

export default setPoll;
