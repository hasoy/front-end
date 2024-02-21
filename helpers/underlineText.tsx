import { Text } from "react-native-paper";

export const underlineText = (
  wordsToUnderline: string[],
  text: string
): { underlinedJsx: React.ReactNode; detectedWords: string[] } => {
  const detectedWords = [];
  const unchangedJsx = <Text>{text}</Text>;
  if (wordsToUnderline.length === 0) return { underlinedJsx: unchangedJsx, detectedWords: [] };
  const underlinedJsx = (
    <Text>
      {text
        .split(/[,:]/i)
        .map((word, index) => {
          if (word.trim().match(new RegExp(wordsToUnderline.join("|"), "i"))) {
            detectedWords.push(word);
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
                {word}
              </Text>
            );
          } else {
            return <Text key={index}>{word}</Text>;
          }
        })
        .reduce((prev, curr, index) => (index === 0 ? [curr] : [...prev, ", ", curr]), [])}
    </Text>
  );
  return { underlinedJsx, detectedWords };
};
