import { render, screen } from '@testing-library/react';
import ProductTable from './ProductTable';

describe('ProductTable', () => {
  it('muestra productos correctamente', () => {
    const data = [
      { id: '1', name: 'Test', price: 10, stock: 5 },
      { id: '2', name: 'Demo', price: 20, stock: 3 }
    ];
    render(<ProductTable data={data} onEdit={() => {}} onDelete={() => {}} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Demo')).toBeInTheDocument();
  });
});