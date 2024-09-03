import React, { useRef, useState } from "react";
import { Close, Search } from "@mui/icons-material";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import useOutsideClick from "../../hooks/useOutsideClick";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

function SearchBar() {
  const ref = useRef(null);
  const categories: string[] = [
    "All",
    "Hello World",
    "Sigma Clothes",
    "Get Categories",
  ];

  const searchHistory: string[] = [
    "All",
    "Hello World",
    "Sigma Clothes",
    "Get Categories",
  ];

  const [queryText, setQueryText] = useState<string>("");
  const [category, setCategory] = useState<string>(() => categories[0]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const handleVisibility = () => setIsHistoryVisible(false);

  useOutsideClick(ref, handleVisibility);

  return (
    <div
      className="flex flex-row justify-center items-center 
    rounded-full text-base xs:px-10 md:px-36 lg:px-48 xl:px-0 xs:mt-6 xl:mt-0 md:h-11 xs:h-9 xl:h-full w-full"
    >
      <SelectCategory
        categories={categories}
        category={category}
        onChange={setCategory}
      />
      <div
        ref={ref}
        className="relative flex flex-col justify-start items-start h-full w-full"
      >
        <InputField
          name={"Search for products and brands"}
          value={queryText}
          onChange={setQueryText}
          onFocus={setIsHistoryVisible}
        />

        {isHistoryVisible && (
          <div className="text-sm absolute top-full bg-transparent bg-white text-primary-text border w-full rounded-lg z-50">
            {searchHistory.map((e) => {
              return (
                <div
                  className="w-full bg-white px-4 py-2
                   shadow-2xl
                  hover:bg-gray-100 cursor-pointer
                  flex flex-row justify-between items-center rounded-lg"
                  onClick={() => {
                    setQueryText(e);
                    setIsHistoryVisible(false);
                  }}
                >
                  <div className="flex items-center gap-x-3">
                  <SearchOutlinedIcon sx={{fontSize : "1rem", color: "#2d2d2d"}}/>
                  {e}
                  </div>
                  <div className="text-primary-text">
                    <Close fontSize="small" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

interface IFProps<T> {
  name: string;
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  onFocus: React.Dispatch<React.SetStateAction<any>>;
}

function InputField({ name, value, onChange, onFocus }: IFProps<string>) {
  return (
    <div
      className={`border-l-0 border-t-2 border-b-2 border-r-2 border-shadow-one 
        rounded-tr-full rounded-br-full placeholder:text-sm
        h-full relative flex flex-row justify-center items-center w-full`}
    >
      <input
        className="outline-none border-primary-text border-none px-4 pr-10 w-full h-full rounded-tr-3xl rounded-br-3xl"
        value={value}
        type="text"
        required
        placeholder={name}
        onFocus={() => onFocus(true)}
        onFocusCapture={() => onFocus(true)}
        onClick={() => onFocus(true)}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute right-0 text-primary text-lg px-3">
        <FaSearch />
      </div>
    </div>
  );
}

interface ISelectCategoryProps {
  categories: string[];
  category: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

function SelectCategory({
  categories,
  category,
  onChange,
}: ISelectCategoryProps) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleOutsideClick = () => setIsVisible(false);

  useOutsideClick(ref, handleOutsideClick);

  return (
    <div
      ref={ref}
      className="relative flex flex-col justify-center items-center
      bg-gray-300 h-full pl-4 pr-3 rounded-tl-full rounded-bl-full"
      onMouseOver={() => setIsVisible(true)}
    >
      {/* SELECT */}
      <div className="flex space-x-2 justify-center items-center">
        <div className="text-nowrap">{category}</div>
        <FaChevronDown size={10} />
      </div>

      {/* OPTIONS */}
      {isVisible && (
        <div
          onMouseLeave={() => setIsVisible(false)}
          className="absolute left-3 top-11 w-max z-50 rounded-lg bg-white"
        >
          {categories.map((e) => {
            return (
              <div
                key={e}
                className={`
                  cursor-pointer
                  rounded-lg text-nowrap
                  ${e == category ? "bg-primary text-white" : " bg-white text-primary-text"}
                  px-4 py-2`}
                onClick={() => {
                  setIsVisible((prev) => !prev);
                  onChange(e);
                }}
              >
                {e}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
