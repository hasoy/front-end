import { Text } from "react-native-paper";

export const underlineText = (wordsToUnderline: string[], text: string): React.ReactNode => {
  return (
    <Text>
      {text
        .split(/[,:]/i)
        .map((word, index) => {
          if (wordsToUnderline.includes(word.trim())) {
            return (
              <Text
                key={index}
                style={{
                  textDecorationLine: "underline",
                  backgroundColor: "red",
                  color: "white",
                  padding: 2,
                  borderRadius: 5,
                }}
              >
                {`${word}(allergie!)`}
              </Text>
            );
          } else {
            return <Text key={index}>{word}</Text>;
          }
        })
        .reduce((prev, curr, index) => (index === 0 ? [curr] : [...prev, ", ", curr]), [])}
    </Text>
  );
};
