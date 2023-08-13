import { StyleSheet } from "react-native";
import { Typography } from "../components/Typography";
import Button from "../components/Button";
import { Title } from "../components/Title";
import Card from "../components/Card";
import { useStore } from "../hooks/useStore";
import { observer } from "mobx-react-lite";
import { LABELS } from "../constants/Labels";

function TabIngredient() {
  const { product } = useStore();

  return (
    <Card padding>
      {product.current_selectedIngredient && (
        <>
          <Title label={product.current_selectedIngredient?.attributes.name} />
          <Button
            label={product.current_selectedIngredient?.attributes.status}
            type={
              product.current_selectedIngredient?.attributes.status === "haram"
                ? "warning"
                : product.current_selectedIngredient?.attributes.status === "doubtful"
                ? "doubtful"
                : "primary"
            }
            onPress={undefined}
          />
          {product.current_selectedIngredient?.attributes.explanation && (
            <>
              <Title label={LABELS.TOELICHTING} level="3" />
              <Typography label={product.current_selectedIngredient?.attributes.explanation} />
            </>
          )}
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({});

export default observer(TabIngredient);
