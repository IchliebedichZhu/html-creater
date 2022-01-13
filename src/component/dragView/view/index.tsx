import { DragMenuListData } from '@/component/dragMenu';
import './index.scss';

type ScreenViewParam = {
  containerId: string;
  width?: number;
  height?: number;
  viewList?: DragMenuListData[];
  handleClick?: handleViewItemFunc;
};

export type handleViewItemFunc = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item: DragMenuListData,
  index: number
) => void;

function ScreenView({
  containerId,
  width = 375,
  height = 667,
  viewList,
  handleClick = () => {},
}: ScreenViewParam) {
  return (
    <section
      id={containerId}
      className='screen_view'
      style={{ width, height }}
      onClick={(e) => {}}
    >
      {viewList?.map((val, index) => (
        <div
          key={`${val.key}_${index}`}
          onMouseDown={(e) => {
            e.preventDefault();
            handleClick(e, val, index);
          }}
        >
          {val.element(val.style || {})}
        </div>
      ))}
    </section>
  );
}

export default ScreenView;
