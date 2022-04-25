import MainTemplate from '@/template/mainTemplate';
import DragMenu, { DragMenuListData } from '@/component/dragMenu';
import DragAttribute from '@/component/dragAttribute';
import { Col, Collapse, Row } from 'antd';
import './index.scss';
import DragView from '@/component/dragView';
import { useCallback, useEffect, useState } from 'react';
import {
  handleMenuClick,
  handleMouseMove,
  handleMouseUp,
  InitTempBox,
} from './methods';
import { useMouseMove, useMouseUp } from '@/hooks/mouseEvent';
import { MENU_LIST, VIEW_MENU_TAB_LIST } from '@/data/menu';
import { useDragMethod } from '@/hooks/drag';
import {
  handleViewItemFunc,
  ViewListPositionData,
} from '@/component/dragView/view';
import type { changeFunc } from '@/component/dragAttribute/attributeForm';
import type {
  customStyleChangeFunc,
  handleStyleChangeFunc,
} from '@/component/dragAttribute/attributeStyle';

const Panel = Collapse.Panel;

let timer: NodeJS.Timer;
/** 是否正在拖动 */
let isDrag = false;
/** 是否正在聚焦 */
let isFocus = false;

function Main() {
  const [viewList, setViewList] = useState<DragMenuListData[]>([]);
  const [currentElement, setCurrentElement] = useState<DragMenuListData>();
  const [_, setIndex] = useState(-1);
  const {
    handleDragMove,
    handleDragUp,
    handleViewClick,
    handleViewRender,
    getContainerPostion,
    getCurrentIndex,
    setCurrentIndex,
  } = useDragMethod();
  useEffect(() => {
    InitTempBox();
    useMouseMove((e) => {
      if (!isDrag) return;
      // 获取当前鼠标移动到的位置
      const insertIndex = handleMouseMove(e, getContainerPostion());
      const containViewList = handleDragMove(e, insertIndex);
      if (containViewList) setViewList([...containViewList]);
    });
    useMouseUp(() => {
      clearTimeout(timer);
      isDrag = false;
      handleMouseUp();
      handleDragUp();
    });
  }, []);

  /** 视图列表点击事件 */
  const handleViewColumnClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      item: DragMenuListData,
      index: number
    ) => {
      timer = setTimeout(() => {
        isDrag = true;
        handleMenuClick(e, item);
      }, 200);
      const [element, currentIndex] = handleViewClick(item, index, false);
      setCurrentElement(element);
      isFocus = false;
      setTimeout(() => {
        isFocus = true;
      }, 1000);
      setIndex(currentIndex);
      setCurrentIndex(currentIndex);
    },
    []
  );

  /** 视图渲染完成回调 */
  const handleViewChange = useCallback(
    (positionList: ViewListPositionData[]) => {
      const containViewList = handleViewRender(positionList);
      setViewList(containViewList);
    },
    []
  );

  /** 空白屏幕点击事件 */
  const handleClickScreen = useCallback(() => {
    if (isFocus) {
      setIndex(-1);
      setCurrentIndex(-1);
      setCurrentElement(undefined);
      isFocus = false;
    }
  }, []);

  /** 菜单组件点击事件 */
  const handleDragMenuClick = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      item: DragMenuListData
    ) => {
      isDrag = true;
      handleMenuClick(e, item);
      handleViewClick(item, -1, true);
      setCurrentElement(item);
    },
    []
  );

  /** 组件属性更改时改变 */
  const handleAttributeChange = useCallback<changeFunc>(
    (item, value, index) => {
      if (currentElement && currentElement.attributes) {
        if (item.type === 'image') {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(value);
          fileReader.onload = (e) => {
            if (e.currentTarget && currentElement.attributes) {
              currentElement.attributes[index].value = (
                e.currentTarget as Record<string, any>
              ).result;
            }
          };
        } else {
          currentElement.attributes[index].value = value;
        }
        setCurrentElement({ ...currentElement });
      }
    },
    [currentElement]
  );

  /** 样式改变时触发 */
  const handleStyleChange = useCallback<handleStyleChangeFunc>(
    (_, value, index) => {
      if (currentElement && currentElement.style) {
        currentElement.style[index].value = value;
        setCurrentElement({ ...currentElement });
      }
    },
    [currentElement]
  );

  /** 自定义样式修改时更新 */
  const handleCustomStyleChange = useCallback<customStyleChangeFunc>((list) => {
    if (currentElement) {
      currentElement.customStyle = list;
      setCurrentElement({ ...currentElement });
    }
  }, []);

  return (
    <MainTemplate>
      <Row className='main_row'>
        <Col span={5}>
          <DragMenu list={MENU_LIST} handleClick={handleDragMenuClick} />
        </Col>
        <Col className='draw_view_main' span={14}>
          <DragView
            tabMenu={VIEW_MENU_TAB_LIST}
            viewList={viewList}
            focusIndex={getCurrentIndex()}
            handleClick={handleViewColumnClick}
            handleViewChange={handleViewChange}
            handleClickScreen={handleClickScreen}
          />
        </Col>
        <Col span={5}>
          <DragAttribute
            title='属性'
            attributeList={currentElement?.attributes}
            styleList={currentElement?.style}
            customStyle={currentElement?.customStyle}
            handleChange={handleAttributeChange}
            handleStyleChange={handleStyleChange}
            customStyleChange={handleCustomStyleChange}
          />
        </Col>
      </Row>
    </MainTemplate>
  );
}

export default Main;
