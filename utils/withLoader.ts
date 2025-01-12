export default async function (fn: Function, promise: Promise<any>) {
    fn(true);
    try {
      return await promise;
    } finally {
      fn(false);
    }
  }