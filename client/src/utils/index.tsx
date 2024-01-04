export function loadMore(element: any, callback: any) {
  function _loadMore() {
    let clientHeight = element.clientHeight; //可视区域的高度/容器的高度
    let scrollTop = element.scrollTop; //向上scroll的高度
    let scrollHeight = element.scrollHeight; //内容高度
    if (clientHeight + scrollTop + 10 >= scrollHeight) {
      callback();
    }
  }
  element.addEventListener("scroll", debounce(_loadMore, 300));
}
export function downRefresh(element: HTMLDivElement, callback: Function) {
  // console.log("downRefresh", event);
  let startY: number; //变量，存储接下时候的纵坐标
  let distance: number; //本次下拉的距离
  let originalTop = element.offsetTop; //最初此元素距离顶部的距离 top=70
  let startTop: number;
  let $timer: any = null;
  element.addEventListener("touchstart", function (event: TouchEvent) {
    if ($timer) clearInterval($timer);
    let touchMove = throttle(_touchMove, 30);
    if (element.scrollTop === 0) {
      startTop = element.offsetTop;
      startY = event.touches[0].pageY; //记录当前点击的纵坐标
      element.addEventListener("touchmove", touchMove);
      element.addEventListener("touchend", touchEnd);
    }

    function _touchMove(event: TouchEvent) {
      let pageY = event.touches[0].pageY; //拿到最新的纵坐标
      if (pageY > startY) {
        distance = pageY - startY;
        element.style.top = startTop + distance + "px";
      } else {
        element.removeEventListener("touchmove", touchMove);
        element.removeEventListener("touchend", touchEnd);
      }
    }

    function touchEnd(_event: TouchEvent) {
      element.removeEventListener("touchmove", touchMove);
      element.removeEventListener("touchend", touchEnd);
      if (distance > 30) {
        callback();
      }
      $timer = setInterval(() => {
        let currentTop = element.offsetTop;
        if (currentTop - originalTop > 1) {
          element.style.top = currentTop - 1 + "px";
        } else {
          element.style.top = originalTop + "px";
        }
      }, 13);
    }
  });
}

export function debounce(fn: any, wait: number) {
  //这个防抖可以使得滚动停止下来再执行
  var timeout: any = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  };
}
export const debounce2 = (fn: any, wait: number) => {
  //这个防抖可以使得滚动停止下来再执行
  let timeout: any = null;
  return function (...args: any[]) {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    try {
      timeout = setTimeout(fn, wait);
    } catch (e) {
      console.log("e", e);
    }
  };
};
export function throttle(func: any, delay: number) {
  var prev = Date.now();
  return function () {
    var context = this;
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      func.apply(context, args);
      prev = Date.now();
    }
  };
}

export const store = {
  set(key: string, val: string) {
    sessionStorage.setItem(key, val);
  },
  get(key: string) {
    return sessionStorage.getItem(key);
  },
};

export function setLocalStorageHomeScrllTop(element: HTMLDivElement) {
  var setLocalStorage = debounce2(window.localStorage.setItem, 100);
  element.addEventListener("scroll", () =>
    setLocalStorage(element, element.scrollTop + " ")
  );
}
