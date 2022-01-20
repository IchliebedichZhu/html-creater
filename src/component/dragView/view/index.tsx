import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { DragMenuListData } from '@/component/dragMenu';
import { useEffect } from 'react';
import './index.scss';

type ScreenViewParam = {
  containerId: string;
  width?: number;
  height?: number;
  viewList?: DragMenuListData[];
  focusIndex?: number;
  handleClick?: handleViewItemFunc;
  handleClickScreen?: () => void;
  handleGetList?: (data: ViewListPositionData[]) => void;
};

export type HandleViewChangeFunc = (data: ViewListPositionData[]) => void;

export type ViewListPositionData = {
  x: number;
  y: number;
};

export type handleViewItemFunc = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item: DragMenuListData,
  index: number
) => void;

/** 解析属性 */
function explainAttribute(
  attrList: AttributeFormList[] = []
): Record<string, any> {
  let obj: Record<string, any> = {};
  attrList.forEach((val) => {
    obj[val.key] = val.value;
  });
  return obj;
}

function ScreenView({
  containerId,
  width = 375,
  height = 667,
  viewList,
  focusIndex = -1,
  handleClick = () => {},
  handleClickScreen = () => {},
  handleGetList = () => {},
}: ScreenViewParam) {
  useEffect(() => {
    // viewList改变渲染完成后重新获取元素的位置，并触发回调
    const positionArr: ViewListPositionData[] = [];
    const parent = document.querySelector(`#${containerId}`);
    if (parent && parent.childNodes && parent.childNodes.length > 0) {
      parent.childNodes.forEach((val) => {
        const boundingClientRect = (val as HTMLElement).getBoundingClientRect();
        const top = boundingClientRect.top;
        const left = boundingClientRect.left;
        positionArr.push({ x: left, y: top + boundingClientRect.height });
      });
      handleGetList(positionArr);
    }
  }, [viewList]);
  return (
    <section
      id={containerId}
      className='screen_view'
      style={{ width, height }}
      onClick={handleClickScreen}
    >
      {viewList?.map((val, index) => (
        <div
          className={focusIndex === index ? 'screen_view_focus' : ''}
          key={`${val.key}_${index}`}
          onMouseDown={(e) => {
            e.preventDefault();
            handleClick(e, val, index);
          }}
          onMouseUp={(e) => {
            e.preventDefault();
          }}
        >
          {val.element(val.style || [], explainAttribute(val.attributes))}
        </div>
      ))}
    </section>
  );
}

export default ScreenView;
