import MainTemplate from '@/template/mainTemplate';
import DragMenu, { DragMenuListData } from '@/component/dragMenu';
import DragAttribute from '@/component/dragAttribute';
import { Col, Collapse, Row } from 'antd';
import './index.scss';
import DragView from '@/component/dragView';
import { useEffect, useState } from 'react';
import {
  handleMenuClick,
  handleMouseMove,
  handleMouseUp,
  InitTempBox,
} from './methods';
import { useMouseMove, useMouseUp } from '@/hooks/mouseEvent';
import { MENU_LIST, VIEW_MENU_TAB_LIST } from '@/data/menu';
import { useDragMethod } from '@/hooks/drag';
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
  return (
    <MainTemplate>
      <Row className='main_row'>
        <Col span={5}>
          <DragMenu
            list={MENU_LIST}
            handleClick={(e, item) => {
              isDrag = true;
              handleMenuClick(e, item);
              handleViewClick(item, -1, true);
            }}
          />
        </Col>
        <Col className='draw_view_main' span={14}>
          <DragView
            tabMenu={VIEW_MENU_TAB_LIST}
            viewList={viewList}
            focusIndex={getCurrentIndex()}
            handleClick={(e, item, index) => {
              timer = setTimeout(() => {
                isDrag = true;
                handleMenuClick(e, item);
              }, 200);
              const [element, currentIndex] = handleViewClick(
                item,
                index,
                false
              );
              setCurrentElement(element);
              isFocus = false;
              setTimeout(() => {
                isFocus = true;
              }, 1000);
              setIndex(currentIndex);
              setCurrentIndex(currentIndex);
            }}
            handleViewChange={(positionList) => {
              const containViewList = handleViewRender(positionList);
              setViewList(containViewList);
            }}
            handleClickScreen={() => {
              if (isFocus) {
                setIndex(-1);
                setCurrentIndex(-1);
                setCurrentElement(undefined);
                isFocus = false;
              }
            }}
          />
        </Col>
        <Col span={5}>
          <DragAttribute
            title='属性'
            attributeList={currentElement?.attributes}
            styleList={currentElement?.style}
            customStyle={currentElement?.customStyle}
            handleChange={(item, value, index) => {
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
            }}
            handleStyleChange={(_, value, index) => {
              if (currentElement && currentElement.style) {
                currentElement.style[index].value = value;
                setCurrentElement({ ...currentElement });
              }
            }}
            customStyleChange={(list) => {
              if (currentElement) {
                currentElement.customStyle = list;
                setCurrentElement({ ...currentElement });
              }
            }}
          />
        </Col>
      </Row>
    </MainTemplate>
  );
}

export default Main;
