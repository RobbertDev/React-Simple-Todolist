import {React, useState} from "react";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskitems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if(task !== '') {
      Keyboard.dismiss();
      setTaskItems([...taskitems, task])
      setTask('') 
    }
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskitems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {
              taskitems.map((item, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                    <Task text={item} />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>

        {/* Write a text */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a Task'} value={task} onChangeText={text => setTask(text)}/>
          <TouchableOpacity
            onPress={() => handleAddTask()}
          >
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#000',
  },
  tasksWrapper: {
    paddingTop: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30
  },
  writeTaskWrapper: {
    position:'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1
  },
  addText: {
    fontSize: 32,
    fontWeight: "bold"
  }
});
