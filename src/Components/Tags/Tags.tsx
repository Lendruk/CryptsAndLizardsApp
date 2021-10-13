import { CloseOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useState } from 'react';
import './styles.scss';

type Tag = {
  name: string;
  saved: boolean;
}

type TagsProps = {  
  tags: Tag[];
  onAddTag?: Function;
  onRemoveTag?: (tag: Tag) => void;
}

export default function Tags(props: TagsProps) {
  const [isCreatingTag, setIsCreatingTag] = useState(false);  
  const { tags, onAddTag, onRemoveTag } = props;
  const inputRef = React.createRef<Input>();

  const onKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      if(onAddTag) {
        onAddTag(inputRef.current?.state.value);
      }

      setIsCreatingTag(false);
    }

    if(event.key === 'Escape') {
      setIsCreatingTag(false);
    }
  };

  return (
    <div className="tags">
      {tags.map(tag => (
        <div className="tag" key={`tag-${tag.name}-${tag.saved}`}>
          <span className="tag-name">{tag.name}</span>
          <CloseOutlined className="delete-tag" onClick={() => onRemoveTag && onRemoveTag(tag)} />
        </div>
      ))}
      {isCreatingTag ? (
        <Input ref={inputRef} onKeyDown={event => onKey(event)} className="tag tag-input" />
      ) : (
      <div onClick={() => setIsCreatingTag(true)} className="tag new">
        + New Tag
      </div>

      )}
    </div>
  );
}