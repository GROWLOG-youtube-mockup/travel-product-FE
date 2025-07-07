import { ClipLoader } from 'react-spinners';

interface Props {
  size?: number;
  color?: string;
}

const LoadingSpinner = ({ size = 32, color = '#36d7b7' }: Props) => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
    <ClipLoader size={size} color={color} />
  </div>
);

export default LoadingSpinner;
