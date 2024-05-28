async function readTextFiles(files: string[]): Promise<string[][]> {
  const fileContents: string[][] = [];
  for (const file of files) {
    const response = await fetch(file);
    const text = await response.text();
    fileContents.push(text.split("\n"));
  }
  return fileContents;
}

export async function getTextContent(
  txt1: string,
  txt2: string
): Promise<{
  answerList: string[];
  wordList: string[];
}> {
  const [answerList, wordList] = await readTextFiles([txt1, txt2]);
  return { answerList, wordList };
}
