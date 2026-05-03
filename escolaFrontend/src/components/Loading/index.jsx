import PropTypes from 'prop-types';
import { Container } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;

  return (
    <div className="loader">
      <div className="loader__spinner" />
    </div>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
