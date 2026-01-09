import React, { useState } from "react";
import "../styles/app.css"; 

export default function CategorySelector({
  categories,
  selected,
  onChange,
  onDelete,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="cat-select-container">
      <div className="cat-select-box" onClick={() => setOpen(!open)}>
        {selected
          ? categories.find((c) => c.id === selected)?.name
          : "Toutes les catégories"}
        <span className="arrow">▾</span>
      </div>

      {open && (
        <div className="cat-dropdown">
          <div className="cat-item" onClick={() => onChange("")}>
            Toutes les catégories
          </div>

          {categories.map((cat) => (
            <div key={cat.id} className="cat-item">
              <span onClick={() => onChange(cat.id)}>{cat.name}</span>

              {/* 删除按钮 */}
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 防止触发选择事件
                  onDelete(cat.id);
                }}
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
