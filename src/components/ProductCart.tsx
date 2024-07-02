import { useState } from 'react';

type ProductLineProps = {
  index: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
};

const ProductCart: React.FC<ProductLineProps> = ({
  index,
  name,
  price,
  quantity,
}) => {
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    setItemQuantity(newQuantity);
  };

  return (
    <div className="flex items-center border-secondary h-fit w-full justify-between border-b py-4">
      <span className="font-medium">{index + 1}.</span>
      <span className="font-medium">{name}</span>
      <span className="font-medium">{price.toFixed(2)} VND</span>
      <div className="flex items-center space-x-2">
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => setItemQuantity(itemQuantity - 1)}
          disabled={itemQuantity <= 1}
        >
          -
        </button>
        <input
          type="number"
          className="w-16 px-2 py-1 border rounded text-center"
          value={itemQuantity}
          onChange={handleQuantityChange}
        />
        <button
          className="bg-gray-200 px-2 py-1 rounded"
          onClick={() => setItemQuantity(itemQuantity + 1)}
        >
          +
        </button>
      </div>
      <span className="font-medium">{(itemQuantity * price).toFixed(2)} VND</span>
    </div>
  );
};

export default ProductCart;