import { useDispatch } from 'react-redux';
import { publishProduct } from '../../../../redux/products/operations';
import ProductItem from './productsItem/productItem';
import { Container, ButtonBlock, Button } from './result.styled';

export default function Result({ product, onSuccess }) {
  const dispatch = useDispatch();

  const handlePublish = async () => {
    const response = await dispatch(publishProduct(product.id));
    if (response.meta.requestStatus === 'rejected') return;
    onSuccess();
  };

  return (
    <Container>
      <ProductItem product={product} />
      <ButtonBlock>
        <Button variant="contained" onClick={() => onSuccess()}>
          Skip
        </Button>
        <Button variant="contained" onClick={handlePublish}>
          Publish
        </Button>
      </ButtonBlock>
    </Container>
  );
}
