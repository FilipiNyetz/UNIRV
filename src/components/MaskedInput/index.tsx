// components/MaskedInput.tsx
import { Input } from "@/components/ui/input";
import { forwardRef, ChangeEvent } from 'react';

type MaskedInputProps = React.ComponentProps<typeof Input> & {
  maskType: 'cpf' | 'phone';
};

const applyMask = (value: string, maskType: 'cpf' | 'phone'): string => {
  let maskedValue = value.replace(/\D/g, ''); // Remove tudo que não é dígito

  if (maskType === 'cpf') {
    maskedValue = maskedValue.replace(/(\d{3})(\d)/, '$1.$2');
    maskedValue = maskedValue.replace(/(\d{3})(\d)/, '$1.$2');
    maskedValue = maskedValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return maskedValue.substring(0, 14); // Limita ao tamanho do CPF
  }

  if (maskType === 'phone') {
    if (maskedValue.length > 10) {
      maskedValue = maskedValue.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else {
      maskedValue = maskedValue.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    }
    return maskedValue.substring(0, 15); // Limita ao tamanho do telefone
  }

  return value;
};

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ maskType, onChange, ...props }, ref) => {
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const maskedValue = applyMask(e.target.value, maskType);
      e.target.value = maskedValue;
      onChange?.(e);
    };

    return (
      <Input
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

MaskedInput.displayName = 'MaskedInput';

export default MaskedInput;