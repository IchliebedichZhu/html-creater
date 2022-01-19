import { DragMenuListData } from '@/component/dragMenu';
import { viewContainerId } from '@/component/dragView';
import {
  HandleViewChangeFunc,
  handleViewItemFunc,
  ViewListPositionData,
} from '@/component/dragView/view';
import { checkIsInContainer } from '@/page/main/methods';
import { deepClone } from '@/utils';

/** 当前选中元素的位置 */
let currentIndex = -1;
/** 当前选中的元素 */
let currentElement: DragMenuListData | null = null;
/** 视图层列表 */
let containViewList: DragMenuListData[] = [];
/** 视图层每个元素的位置信息， 顺序与containViewList一样 */
let containerPosition: ViewListPositionData[] = [];
/** 是否正在渲染新的视图 */
let isSetting = false;
/** 拖动类型是否为插入类型 */
let isInsert = false;

export function useDragMethod() {
  /** 监听选中拖动事件 */
  const handleDragMove = function (e: MouseEvent, insertIndex?: number) {
    if (!currentElement) return;
    // 正在渲染直接返回
    if (isSetting) return;
    // 若不在视图范围内直接返回
    if (!checkIsInContainer(e, viewContainerId)) return;

    if (insertIndex != undefined && insertIndex >= 0) {
      if (currentIndex === insertIndex && !isInsert) return;
      else if (currentIndex !== -1 && !isInsert) {
        containViewList.splice(currentIndex, 1);
      }
      // 克隆旧元素放入临时变量
      const oldElement = deepClone(containViewList[insertIndex]);
      isSetting = true;
      if (containViewList.length === insertIndex) {
        if (isInsert) {
          containViewList.push(deepClone(currentElement));
        } else {
          containViewList.splice(insertIndex, 1, deepClone(currentElement));
        }
      } else {
        containViewList.splice(
          insertIndex,
          1,
          deepClone(currentElement),
          oldElement
        );
      }

      currentIndex = insertIndex;
      isInsert = false;
      return containViewList;
    } else if (containViewList.length === 0) {
      if (currentElement) {
        containViewList.push(deepClone(currentElement));
        isSetting = true;
        currentIndex = 0;
        return containViewList;
      }
    }
  };

  /** 鼠标弹起事件 */
  const handleDragUp = function () {
    isInsert = false;
    isSetting = false;
  };

  /** 视图点击事件 */
  const handleViewClick = function (
    item: DragMenuListData,
    index: number,
    isInsert: boolean = false
  ) {
    currentElement = item;
    currentIndex = index;
    isInsert = isInsert;
  };

  /** 视图渲染完成事件 */
  const handleViewRender = function (positionList: ViewListPositionData[]) {
    if (positionList && positionList.length) {
      containerPosition = positionList;
      positionList.forEach((val, index) => {
        containViewList[index].position = val;
      });
    }
    if (positionList.length > 1) {
      setTimeout(() => {
        isSetting = false;
      }, 0);
    }
    return containViewList;
  };

  const getContainerPostion = () => {
    return containerPosition;
  };

  return {
    handleDragMove,
    handleDragUp,
    handleViewClick,
    handleViewRender,
    getContainerPostion,
  };
}
