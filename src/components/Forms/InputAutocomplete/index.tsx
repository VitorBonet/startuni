import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { IconBaseProps } from "react-icons";
import { FiAlertCircle } from "react-icons/fi";
import { useField } from "@unform/core";

import { 
  Container, 
  InputContainer, 
  Error,
  SearchResult,
  SearchResultGroup,
  SearchResultItem 
} from "./styles";
import { title } from "node:process";

interface IDataAutocomprete {
  id: string;
  description: string;
}

interface InputAutocompleteProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
  label: string;
  data: IDataAutocomprete[],
}

export function InputAutocomplete({
  name,
  icon: Icon,
  containerStyle = {},
  label,
  data,
  ...rest
}: InputAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputHiddenRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const searchResultRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [seletedId, setSeletedId] = useState('');
  const [cursor, setCursor] = useState(0);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  const nameAutocomplete =  name + '_autocomplete';

  const handlenputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const habdleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputHiddenRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const suggestions = useMemo(() => {
    if(!search) return data;
    
    return data.filter(item => item.description.toLowerCase().includes(search.toLowerCase()))
  }, [data, search]);

  function showSugegestion() {
    setIsVisible(true);
  }

  function hideSugegestion() {
    setIsVisible(false);
  }

  function handleClickOutside(event) {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      hideSugegestion();
    }
  }

  function selectItem(item) {
    hideSugegestion();
    setSearch(item.description);
    setSeletedId(item.id);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const keyboardNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      isVisible ? setCursor(c => (c < suggestions.length - 1 ? c + 1 : c)) : showSugegestion();
    }

    if (e.key === 'ArrowUp') {
      setCursor(c => (c > 0 ? c-1 : 0));
    }

    if (e.key === 'Escape') {
      hideSugegestion();
    }

    if (e.key === 'Enter' && cursor > 0) {
      setSearch(suggestions[cursor].description);
      setSeletedId(suggestions[cursor].id);
      hideSugegestion();
    }

    if (e.key === 'Backspace') {
      setSeletedId('');
    }
  }
  
  return (
    <Container ref={searchRef}>
      <label>{label}</label>
      <InputContainer
        style={containerStyle}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
      >
        <input
          autoComplete="off"
          value={search}
          name={nameAutocomplete}
          onFocus={handlenputFocus}
          onBlur={habdleInputBlur}
          defaultValue={defaultValue}
          ref={inputRef}
          onClick={showSugegestion}
          onChange={e => setSearch(e.target.value)}
          onKeyDown={keyboardNavigation}
          {...rest}
        />
        <input
          type="hidden"
          value={seletedId}
          ref={inputHiddenRef}
          defaultValue={defaultValue}
          name={name}
        />
        
        {error && (
          <Error title={error}>
            <FiAlertCircle color="#c53030" size={20} />
          </Error>
        )}
      </InputContainer>
      
      {isVisible && (
          <SearchResult>
            <SearchResultGroup ref={searchResultRef}>
              { suggestions.map((suggestion, idx) => ( 
                <SearchResultItem
                  key={suggestion.id}
                  onClick={() => selectItem(suggestion)}
                  active={cursor === idx ? true : false}
                  >{suggestion.description}</SearchResultItem>
               )) }
            </SearchResultGroup>
          </SearchResult>
        )}
    </Container>
  );
};
