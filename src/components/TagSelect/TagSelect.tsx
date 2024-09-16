import React, { useState, useEffect, useRef } from 'react';

interface TagSelectProps {
  initialTags?: string[];
  onChange?: (tags: string[]) => void;
}

const TagSelect: React.FC<TagSelectProps> = ({ initialTags, onChange }) => {
  const [tags, setTags] = useState<string[]>(initialTags || []);
  const [textInput, setTextInput] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange?.(tags);
  }, [tags]);

  useEffect(() => {
  }, [initialTags]);

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !hasTag(trimmedTag)) {
      setTags((prevTags) => [...prevTags, trimmedTag]);
      clearSearch();
      textInputRef.current?.focus();
    }
    fireTagsUpdateEvent();
  };

  const fireTagsUpdateEvent = () => {
    setOpen(false);
  };

  const hasTag = (tag: string) => {
    return tags.some(e => e.toLowerCase() === tag.toLowerCase());
  };

  const removeTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
    fireTagsUpdateEvent();
  };

  const search = (q: string) => {
    if (q.includes(',')) {
      q.split(',').forEach(val => addTag(val));
    }
    toggleSearch(q);
  };

  const clearSearch = () => {
    setTextInput('');
    toggleSearch(textInput);
  };

  const toggleSearch = (textInput: string) => {
    setOpen(textInput !== '');
  };

  return (
    <div className="my-6">
      <label className="block">Tags</label>
      <div className="relative">
        <input
          value={textInput}
          onChange={(e) => {
            setTextInput(e.target.value);
            search(e.target.value);
          }}
          ref={textInputRef}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter some tags"
        />
        {open && (
          <div className="absolute z-40 left-0 mt-2 w-full">
            <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  addTag(textInput);
                }}
                className="block py-1 px-5 cursor-pointer hover:bg-gray-500 hover:text-white"
              >
                Add tag "<span className="font-semibold">{textInput}</span>"
              </a>
            </div>
          </div>
        )}
        {tags.map((tag, index) => (
          <div key={index} className="bg-gray-100 inline-flex items-center text-sm rounded mt-2 mr-1">
            <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs">{tag}</span>
            <button
              onClick={(e) => {
                e.preventDefault();
                removeTag(index);
              }}
              type='button'
              className="w-6 h-8 inline-block align-middle text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6 fill-current mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSelect;
