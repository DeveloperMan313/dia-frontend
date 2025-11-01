import type { FC, FormEventHandler, KeyboardEventHandler } from "react";
import { Form } from "react-bootstrap";

interface TextInputProps {
    type: 'text';
    name?: string;
    value?: string;
    placeholder?: string;
    label?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

export const TextInput: FC<TextInputProps> = ({
    type,
    name,
    value,
    placeholder,
    label,
    onChange,
    onKeyDown,
}) => {
    return (
        <div className="text-input">
            {label && <p className="text-input__label">label</p>}
            <Form.Control className="text-input__input" type={type} name={name} value={value}
                placeholder={placeholder} onChange={onChange} onKeyDown={onKeyDown} />
        </div>
    );
};
