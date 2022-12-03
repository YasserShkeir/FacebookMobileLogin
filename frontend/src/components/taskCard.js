import { View, Text, Image } from "react-native";

// Styles
import { taskCardStyles } from "../styles";

const TaskCard = ({ task }) => {
  return (
    <View style={taskCardStyles.taskCard}>
      <Image source={{ uri: task.image }} style={taskCardStyles.image} />
      <View>
        <Text style={taskCardStyles.taskTitle}>{task.title}</Text>
        <Text style={taskCardStyles.taskDescription}>{task.description}</Text>
        <Text style={taskCardStyles.taskDate}>{task.date}</Text>
      </View>
    </View>
  );
};

export default TaskCard;
