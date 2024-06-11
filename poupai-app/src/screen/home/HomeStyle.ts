import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  selectContainer: {
    marginBottom: 20,
  },
  emojiContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    width: 250,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
  },
  emojiBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 90,
  },
  emojiText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  progressoText: {
    fontSize: 16,
  },
  metaText: {
    fontSize: 16,
  },
  progressBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0df',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'black',
  },
});
