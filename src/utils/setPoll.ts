const setPoll = (fn, time:number) => {
  setInterval(() => {
    fn();
  }, time);
};

export default setPoll;
