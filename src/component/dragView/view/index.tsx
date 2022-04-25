import { AttributeFormList } from '@/component/dragAttribute/attributeForm';
import { DragMenuListData } from '@/component/dragMenu';
import { useEffect } from 'react';
import './index.scss';
import ViewColumn from './viewColumn';

type ScreenViewParam = {
  isPreview: boolean;
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

function ScreenView({
  isPreview = false,
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
        <ViewColumn
          isPreView={isPreview}
          focusIndex={focusIndex}
          index={index}
          val={val}
          handleClick={handleClick}
          key={`${val.key}_${index}`}
        />
      ))}
    </section>
  );
}

export default ScreenView;
