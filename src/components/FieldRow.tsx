import React from "react";
import { Field, FieldType } from "../types/Field";
import ToggleSwitch from "./ToggleSwitch";

interface FieldRowProps {
  field: Field;
  depth: number;
  onUpdate: (id: string, updatedField: Partial<Field>) => void;
  onAdd: (parentId: string) => void;
  onDelete: (id: string) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({
  field,
  depth,
  onUpdate,
  onAdd,
  onDelete,
}) => {
  return (
    <div className="ml-4 mb-2">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={field.key}
          onChange={(e) => onUpdate(field.id, { key: e.target.value })}
          className="border px-2 py-1 rounded w-40"
        />

        <select
          value={field.type}
          onChange={(e) =>
            onUpdate(field.id, {
              type: e.target.value as FieldType,
              children: e.target.value === "nested" ? [] : undefined,
            })
          }
          className="border px-2 py-1 rounded"
        >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="nested">Nested</option>
        </select>

        <ToggleSwitch
          isOn={field.enabled ?? true}
          onToggle={() => onUpdate(field.id, { enabled: !(field.enabled ?? true) })}
        />

        <button onClick={() => onDelete(field.id)} className="text-red-500 text-xl">
          ❌
        </button>

        {field.type === "nested" && (
          <button onClick={() => onAdd(field.id)} className="text-blue-500 text-xl">
            ➕
          </button>
        )}
      </div>

      {field.children && (
        <div className="ml-6">
          {field.children.map((child) => (
            <FieldRow
              key={child.id}
              field={child}
              depth={depth + 1}
              onUpdate={onUpdate}
              onAdd={onAdd}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FieldRow;