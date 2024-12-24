export const wrapPromise = async (promise: Promise<any>) => {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [undefined, err];
  }
};

export const wrapQueryResponse = (success: any, fail: any = null) => {
  if (success) {
    return {
      code: 10000,
      msg: 'success',
      data: success,
    }
  } else {
    return {
      code: 0,
      msg: 'fail',
      data: fail?.stack || null,
    }
  }
}

export const wrapListResponse = (success: any, fail: any) => {
  if (success) {
    const [list, total] = success
    return {
      code: 10000,
      msg: 'success',
      data: {
        list,
        total
      }
    }
  } else {
    return {
      code: 0,
      msg: 'fail',
      data: fail?.stack || null,
    }
  }
}

export const wrapActionResponse = (success: any, fail: any) => {
  if (success) {
    return {
      code: 10000,
      msg: 'success',
      data: {
        affected: success.affected,
      },
    }
  } else {
    return {
      code: 0,
      msg: 'fail',
      data: fail?.stack || null,
    }
  }
}