import { ElementType } from "react";
import { ScrollView, View, Text } from "react-native";

export type Field<T> = {
  label: string;
  width: number;
  render: (row: T) => React.ReactNode;
};

export function Table<T>(props: { rows: T[]; fields: Field<T>[] }) {
  let { rows, fields } = props;
  //   rows = [
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //     ...rows,
  //   ];
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "#C1C0B9",
      }}
    >
      <THead fields={fields} />
      <TBody rows={rows} fields={fields} />
    </View>
  );
}

function THead(props: { fields: Field<any>[] }) {
  const { fields } = props;
  return (
    <View>
      <TRow>
        {fields.map((field, index) => (
          <Col key={index} width={field.width}>
            {field.label}
          </Col>
        ))}
      </TRow>
    </View>
  );
}

function TBody<T>(props: { rows: T[]; fields: Field<T>[] }) {
  const { rows, fields } = props;
  return (
    <ScrollView>
      {rows.map((row, index) => (
        <TRow key={index}>
          {fields.map((field, index) => (
            <Col key={index} width={field.width}>
              {field.render(row)}
            </Col>
          ))}
        </TRow>
      ))}
    </ScrollView>
  );
}

function TRow(props: { children: React.ReactNode }) {
  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {props.children}
    </View>
  );
}

function Col(props: { children: React.ReactNode; width: number }) {
  let children = props.children;
  if (typeof children === "number") {
    children = children.toLocaleString();
  }
  if (typeof children === "string") {
    children = <Text>{children}</Text>;
  }
  return <View style={{ width: props.width }}>{children}</View>;
}
