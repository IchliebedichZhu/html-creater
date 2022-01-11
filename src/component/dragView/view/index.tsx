import './index.scss';

type ScreenViewParam = {
  width?: number;
  height?: number;
};

function ScreenView({ width = 375, height = 667 }: ScreenViewParam) {
  return <section className='screen_view' style={{ width, height }}></section>;
}

export default ScreenView;
