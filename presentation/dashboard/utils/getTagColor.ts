export const getTagColor = (tag: string) => {
    const tagColors: Record<string, string> = {
      ANDROID: "#E4A72D",  // Yellow-Orange
      NODE_JS: "#8CC84B",   // Green
      RAILS: "#CC0000",     // Red
      IOS: "#5FCF64",       // Light Green
      REACT: "#61DAFB",     // Blue
    };
  
    return tagColors[tag.toUpperCase()] || "#444";
  };
  