import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import styles from "./TypographySettings.module.scss";
import { fonts, ratios, useTypographyStore } from "@/shared/typography";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";

const MIN = 1;

export function TypographySettings() {
  const { config, updateConfig } = useTypographyStore();
  const [size, setSize] = useState<string>(String(config.baseSize));

  const onFontChange = (value: string) => {
    const font = fonts.find((f) => f.id === value);
    if (!font) return;
    updateConfig({ font });
  };

  const onRatioChange = (value: string) => {
    const ratio = Number(value);
    updateConfig({ ratio });
  };

  const onSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSize(value);
  };

  const commit = (raw: number) => {
    const next = isNaN(raw) || raw < MIN ? config.baseSize : raw;

    setSize(String(next));
    updateConfig({ baseSize: next });
  };

  const onSizeBlur = () => {
    commit(Number(size));
  };

  const onSizeKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      commit(Number(size));
    }
    if (event.key === "ArrowUp") {
      commit(Number(size) + 1);
    }
    if (event.key === "ArrowDown") {
      commit(Number(size) - 1);
    }
  };

  useEffect(() => {
    setSize(String(config.baseSize));
  }, [config.baseSize]);

  return (
    <FieldSet className={styles.TypographySettings}>
      <FieldGroup>
        <Field>
          <FieldLabel>Ratio</FieldLabel>
          <Select value={String(config.ratio)} onValueChange={onRatioChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                {ratios.map(({ value, name }) => (
                  <SelectItem key={name} value={String(value)}>
                    {value} {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel>Font size</FieldLabel>
          <InputGroup>
            <InputGroupAddon align={"inline-end"}>px</InputGroupAddon>
            <InputGroupInput
              value={size}
              onChange={onSizeChange}
              onBlur={onSizeBlur}
              onKeyDown={onSizeKeyDown}
            />
          </InputGroup>
          <FieldDescription>
            Минимальный размер при котором глазу удобно читать - 14px
          </FieldDescription>
        </Field>
      </FieldGroup>

      <FieldSeparator />

      <FieldGroup>
        <Field>
          <FieldLabel>Font</FieldLabel>
          <Select value={config.font.id} onValueChange={onFontChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                {fonts.map(({ id, name }) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
