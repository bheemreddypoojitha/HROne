import React, { useEffect, useState } from "react";
import { Field } from "../types/Field";
import FieldRow from "./FieldRow";

const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2);

const SchemaBuilder: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [finalJson, setFinalJson] = useState<any>(null);

  const handleAddField = (parentId?: string) => {
    const newField: Field = {
      id: generateId(),
      key: "",
      type: "string",
      enabled: true,
    };

    if (!parentId) {
      setFields([...fields, newField]);
    } else {
      const updateChildren = (items: Field[]): Field[] =>
        items.map((item) =>
          item.id === parentId && item.type === "nested"
            ? {
                ...item,
                children: [...(item.children || []), newField],
              }
            : {
                ...item,
                children: item.children ? updateChildren(item.children) : undefined,
              }
        );
      setFields(updateChildren(fields));
    }
  };

  const handleUpdateField = (id: string, updatedField: Partial<Field>) => {
    const updateField = (items: Field[]): Field[] =>
      items.map((item) =>
        item.id === id
          ? { ...item, ...updatedField }
          : {
              ...item,
              children: item.children ? updateField(item.children) : undefined,
            }
      );
    setFields(updateField(fields));
  };

  const handleDeleteField = (id: string) => {
    const deleteField = (items: Field[]): Field[] =>
      items
        .filter((item) => item.id !== id)
        .map((item) => ({
          ...item,
          children: item.children ? deleteField(item.children) : undefined,
        }));
    setFields(deleteField(fields));
  };

  const buildJson = (items: Field[]): any => {
    const obj: any = {};
    items.forEach(({ key, type, children, enabled }) => {
      if (!key) return;
      obj[key] = {
        type,
        required: enabled ?? true,
        ...(type === "nested" ? { properties: buildJson(children || []) } : {}),
      };
    });
    return obj;
  };

  useEffect(() => {
    setFinalJson(buildJson(fields));
  }, [fields]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Schema Builder</h2>
      {fields.map((field) => (
        <FieldRow
          key={field.id}
          field={field}
          depth={0}
          onUpdate={handleUpdateField}
          onAdd={handleAddField}
          onDelete={handleDeleteField}
        />
      ))}

      <div className="my-4">
        <button
          onClick={() => handleAddField()}
          className="bg-gray-200 px-6 py-2 rounded shadow"
          style={{ width: "400px" }}
        >
          ➕ Add Item
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Live JSON Preview:</h3>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
        {JSON.stringify(finalJson, null, 2)}
      </pre>

      <h3 className="text-lg font-semibold mt-6 mb-2">Final JSON Output:</h3>
      <button
        onClick={() => alert(JSON.stringify(finalJson, null, 2))}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        Submit JSON
      </button>
    </div>
  );
};

export default SchemaBuilder;


