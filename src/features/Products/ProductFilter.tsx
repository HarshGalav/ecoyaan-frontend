import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

type AvailabilityFilter = {
  label: string;
  selected: boolean;
};

type BrandFilter = {
  label: string;
  selected: boolean;
};

type ColorFilter = {
  label: string;
  selected: boolean;
};

interface Filters {
  availability: Record<'in-stock' | 'sold-out', AvailabilityFilter>;
  price: { min: string; max: string };
  brand: Record<'brand-a' | 'brand-b' | 'brand-c' | 'brand-d' | 'brand-e', BrandFilter>;
  color: Record<'red' | 'blue' | 'green' | 'yellow' | 'black', ColorFilter>;
}

const initialFilters: Filters = {
  availability: {
    'in-stock': { label: 'In Stock', selected: false },
    'sold-out': { label: 'Sold Out', selected: false }
  },
  price: { min: '', max: '' },
  brand: {
    'brand-a': { label: 'Brand A', selected: false },
    'brand-b': { label: 'Brand B', selected: false },
    'brand-c': { label: 'Brand C', selected: false },
    'brand-d': { label: 'Brand D', selected: false },
    'brand-e': { label: 'Brand E', selected: false }
  },
  color: {
    'red': { label: 'Red', selected: false },
    'blue': { label: 'Blue', selected: false },
    'green': { label: 'Green', selected: false },
    'yellow': { label: 'Yellow', selected: false },
    'black': { label: 'Black', selected: false }
  }
};

const ProductFilter: React.FC<{
  onSortChange: (sortOption: string) => void;
  onFilterChange: (filterOption: string) => void;
  onCloseFilter: () => void;
}> = ({ onSortChange, onFilterChange, onCloseFilter }) => {

  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  const [filters, setFilters] = useState<Filters>(initialFilters);

  const handleAvailabilityClick = () => setIsAvailabilityOpen(prev => !prev);
  const handlePriceClick = () => setIsPriceOpen(prev => !prev);
  const handleBrandClick = () => setIsBrandOpen(prev => !prev);
  const handleColorClick = () => setIsColorOpen(prev => !prev);

  const handleFilterChange = (category: keyof Filters, filter: string, value: any) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [filter]: value
      }
    }));
    onFilterChange(filter);
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
    onFilterChange('clear-all');
  };

  const hasActiveFilters = Object.values(filters.availability).some(filter => filter.selected) ||
    Object.values(filters.price).some(value => value !== '') ||
    Object.values(filters.brand).some(filter => filter.selected) ||
    Object.values(filters.color).some(filter => filter.selected);

  return (
    <div className="border border-gray-300 xs:fixed lg:sticky xs:z-[3400] lg:z-10 bg-white xs:right-0 lg:left-0 lg:top-0 xs:top-0 lg:rounded-2xl xs:w-80 sm:w-96 xs:h-full lg:w-[25vw] xl:w-80 lg:h-[40rem] p-4 gap-y-3 flex flex-col">
      <div className="border-b pb-5 xs:flex lg:hidden items-center justify-between">
        <div className="flex gap-x-2 items-center">
          <CloseOutlinedIcon 
            className="cursor-pointer" 
            onClick={onCloseFilter}
          />
          <p className="text-2xl text-green-800 font-semibold">Filters</p>
        </div>
        <div>
          {hasActiveFilters && <button onClick={clearAllFilters} className="px-2 rounded-lg text-lg">Clear</button>}
        </div>
      </div>
      <div className="mb-4 xs:hidden lg:flex flex-col gap-y-3 mt-3 items-start">
        <label htmlFor="sort" className="text-xl text-green-800 font-semibold">Sort by :</label>
        <select id="sort" onChange={(e) => onSortChange(e.target.value)} className="mt-1 bg-white text-sm block w-full p-1 outline-none rounded-md cursor-pointer">
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
          <option value="recommended">Recommended</option>
          <option value="relevant">Relevant</option>
        </select>
      </div>
      <div className="flex flex-col items-start gap-y-5">
        <div className="xs:hidden lg:flex justify-between w-full items-center">
          <label className="text-xl text-green-800 font-semibold">Filters :</label>
          {hasActiveFilters && <button onClick={clearAllFilters} className="text-red-500">Clear All</button>}
        </div>
        <div id="filter" className="mt-3 block w-full px-1 text-sm p-1 bg-white rounded-md">
          <div className="border-b pb-2">
            <div className="flex justify-between cursor-pointer" onClick={handleAvailabilityClick}>
              <h1 className="text-green-800 xs:text-base lg:text-lg">Availability</h1>
              <p><ChevronDownIcon className={`w-4 transform ${isAvailabilityOpen ? 'rotate-180' : ''}`} /></p>
            </div>
            {isAvailabilityOpen && (
              <ul className="mt-3 flex flex-col px-3 gap-y-2">
                {Object.entries(filters.availability).map(([key, { label, selected }]) => (
                  <li key={key}>
                    <label className="flex items-center gap-x-2">
                      <input type="checkbox" checked={selected} onChange={(e) => handleFilterChange('availability', key as 'in-stock' | 'sold-out', { label, selected: e.target.checked })} className="mr-2 size-4" />
                      <p className="xs:text-sm lg:text-base">{label}</p>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4 border-b pb-3">
            <div className="flex justify-between cursor-pointer" onClick={handlePriceClick}>
              <h1 className="text-green-800 xs:text-base lg:text-lg">Price</h1>
              <p><ChevronDownIcon className={`w-4 transform ${isPriceOpen ? 'rotate-180' : ''}`} /></p>
            </div>
            {isPriceOpen && (
              <div className="mt-3 flex flex-col px-3 gap-y-2">
                <label className="block text-sm">
                  <p className="xs:text-sm lg:text-base">Min Price</p>
                  <input type="number" value={filters.price.min} onChange={(e) => handleFilterChange('price', 'min', e.target.value)} className="block w-full px-3 mt-1 p-1 border rounded-md" placeholder="Min" />
                </label>
                <label className="block text-sm mt-2">
                  <p className="xs:text-sm lg:text-base">Max Price</p>
                  <input type="number" value={filters.price.max} onChange={(e) => handleFilterChange('price', 'max', e.target.value)} className="block w-full px-3 mt-1 p-1 border rounded-md" placeholder="Max" />
                </label>
              </div>
            )}
          </div>

          <div className="mt-4 border-b pb-3">
            <div className="flex justify-between cursor-pointer" onClick={handleBrandClick}>
              <h1 className="text-green-800 xs:text-base lg:text-lg">Brand</h1>
              <p><ChevronDownIcon className={`w-4 transform ${isBrandOpen ? 'rotate-180' : ''}`} /></p>
            </div>
            {isBrandOpen && (
              <ul className="mt-3 flex flex-col px-3 gap-y-2">
                {Object.entries(filters.brand).map(([key, { label, selected }]) => (
                  <li key={key}>
                    <label className="flex items-center gap-x-2">
                      <input type="checkbox" checked={selected} onChange={(e) => handleFilterChange('brand', key as 'brand-a' | 'brand-b' | 'brand-c' | 'brand-d' | 'brand-e', { label, selected: e.target.checked })} className="mr-2 size-4" />
                      <p className="xs:text-sm lg:text-base">{label}</p>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-between cursor-pointer" onClick={handleColorClick}>
              <h1 className="text-green-800 xs:text-base lg:text-lg">Color</h1>
              <p><ChevronDownIcon className={`w-4 transform ${isColorOpen ? 'rotate-180' : ''}`} /></p>
            </div>
            {isColorOpen && (
              <ul className="mt-3 flex flex-col px-3 gap-y-2">
                {Object.entries(filters.color).map(([key, { label, selected }]) => (
                  <li key={key}>
                    <label className="flex items-center gap-x-2">
                      <input type="checkbox" checked={selected} onChange={(e) => handleFilterChange('color', key as 'red' | 'blue' | 'green' | 'yellow' | 'black', { label, selected: e.target.checked })} className="mr-2 size-4" />
                      <p className="xs:text-sm lg:text-base">{label}</p>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
