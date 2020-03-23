import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useMutation, useQuery } from '@apollo/react-hooks';
import { fetchTodos } from '../queries/queries';
import { addTodo, deleteTodo, toggleDone, updateTodo } from '../queries/mutations';

import AddEditPopup from '../components/AddEditPopup';
import FiltersPopup from '../components/FiltersPopup';
import Colors from '../constants/Colors';

const ADD = 'Add';
const EDIT = 'Edit';

const PRIORITY = 'PRIORITY';
const DATE = 'DATE';
const DESCRIPTION = 'DESCRIPTION';
const ASCENDING = 'ASCENDING';

const Home = () => {

    const { loading, error, data } = useQuery(fetchTodos);
    const [addTodoMutation] = useMutation(addTodo);
    const [deleteTodoMutation] = useMutation(deleteTodo);
    const [toggleDoneMutation] = useMutation(toggleDone);
    const [updateTodoMutation] = useMutation(updateTodo);

    const [showAddTodoPopup, setShowAddTodoPopup] = useState(false);
    const [showEditTodoPopup, setShowEditTodoPopup] = useState(false);
    const [showFiltersPopup, setShowFiltersPopup] = useState(false);

    const [todos, setTodos] = useState([]);
    const [currentTodo, setCurrentTodo] = useState();

    const [filter, setFilter] = useState(DATE);
    const [sorting, setSorting] = useState(ASCENDING);

    useEffect(() => {     
        if (!loading && !error) {
            const sortedItems = sortItems(data.todos, filter, sorting);
            setTodos(sortedItems);
        }
    }, [data])

    // Called when todo is added
    const addTodoHandler = (text, priority) => {
        if (text && text.trim() != '') {
            const newItem = {
                id: 1000,
                createdAt: new Date(),
                description: text,
                priority: priority || 1,
                completed: false,
            };
            const items = [newItem, ...todos];
            const sortedItems = sortItems(items, filter, sorting);
            setTodos(sortedItems);
            addTodoMutation({
                variables: {
                    description: text,
                    priority: priority || 1 
                }
            }).then((items) => {
                const sortedItems = sortItems(items.data.addTodo, filter, sorting);
                setTodos(sortedItems);
            })
        }
        setShowAddTodoPopup(false);
    }

    // Called when todo is edited
    const updateTodoHandler = (id, text, priority) => {
        if (text && text.trim() != '') {
            const editedItem = todos.find(todo => todo.id === id);
            updateTodoMutation({
                variables: {
                    id: id,
                    description: text,
                    priority: priority || 1
                },
                optimisticResponse: {
                    __typename: 'Mutation',
                    updateTodo: {
                        id: id,
                        createdAt: editedItem.createdAt,
                        description: text,
                        priority: priority || 1,
                        completed: editedItem.completed,
                        __typename: 'TodoType'
                    }
                }
            }).then((items) => {
                const sortedItems = sortItems(items.data.updateTodo, filter, sorting);
                setTodos(sortedItems);
            })
        }
        setShowEditTodoPopup(false);
    }

    // Called when todo is deleted
    const deleteTodoHandler = (id) => {
        const filteredItems = todos.filter(todo => {
            return todo.id !== id;
        });
        const sortedItems = sortItems(filteredItems, filter, sorting);
        setTodos(sortedItems);
        deleteTodoMutation({
            variables: {
                id: id
            }
        }).then((items) => {
            const sortedItems = sortItems(items.data.deleteTodo, filter, sorting);
            setTodos(sortedItems);
        })
    }

    // Called when todo is marked as done
    const toggleDoneHandler = (item) => {
        toggleDoneMutation({
            variables: {
                id: item.id,
                completed: item.completed
            },
            optimisticResponse: {
                __typename: 'Mutation',
                toggleDone: {
                    id: item.id,
                    createdAt: item.createdAt,
                    description: item.description,
                    priority: item.priority,
                    completed: !item.completed,
                    __typename: 'TodoType'
                }
            }
        })
        .then((items) => {
            const sortedItems = sortItems(items.data.toggleDone, filter, sorting);
            setTodos(sortedItems);
        })
    }

    // Called every time a filter or sorting is selected
    const filtersCallback = (filterType, sortingType) => {
        setFilter(filterType);
        setSorting(sortingType);
    }

    // Called when the filter popup gets closed
    const filtersHandler = () => {
        const sortedItems = sortItems(todos, filter, sorting);
        setTodos(sortedItems);
        setShowFiltersPopup(false);
    }

    // Helper to sort items
    const sortItems = (items, filterType, sortingType) => {
        return items.sort((a, b) => {
            if (filterType === DATE) {
                return sortingType === ASCENDING ? a.createdAt > b.createdAt : a.createdAt < b.createdAt;
            } else if (filterType === PRIORITY) {
                return sortingType === ASCENDING ? a.priority > b.priority : a.priority < b.priority;
            } else if (filterType === DESCRIPTION) {
                return sortingType === ASCENDING ? a.description > b.description : a.description < b.description;
            }
        });
    }

    const TodoItem = props => {
        const { item } = props;
        return(
            <View style={styles.todoItemContainer}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={toggleDoneHandler.bind(this, item)}
                    onLongPress={() => {
                        setCurrentTodo(item);
                        setShowEditTodoPopup(true);
                    }}>
                    <View style={styles.todoItemTextContainer}>
                        {item.completed && <Icon 
                                name='check'
                                color={Colors.TEXT}
                                size={25}/>}
                        <Text style={{
                            ...styles.descriptionText,
                             marginLeft: item.completed ? 10 : 0
                        }}>{item.description}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1.0} 
                    onPress={deleteTodoHandler.bind(this, item.id)}>
                    <Icon 
                        name='close'
                        color={Colors.RED}
                        size={15}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.titleTextContainer}>
                <Text style={styles.titleText}>My Todos</Text>
            </View>
            <TouchableOpacity
                style={styles.filterIconContainer}
                activeOpacity={0.7}
                onPress={() => !showFiltersPopup ? setShowFiltersPopup(true) : filtersHandler()}>
                <Icon 
                    name='filter-list'
                    size={35}
                    color={Colors.PRIMARY}
                />
            </TouchableOpacity>
            {loading ? 
                <View style={styles.todoListContainer}>
                    <ActivityIndicator
                        size='large'
                        color={Colors.PRIMARY}
                    />
                </View> 
            :
                (error ?
                    <View style={styles.todoListContainer}>
                        <Text style={styles.descriptionText}>There was a problem loading the todos</Text> 
                    </View> 
                :
                    (todos.length === 0 ?  
                        <View style={styles.todoListContainer}>
                            <Text style={styles.descriptionText}>Looks so empty here...add a todo!</Text> 
                        </View>  
                    :    
                        <View style={styles.todoListContainer}>
                            {todos.map(todo => {
                                return <TodoItem
                                    key={todo.id}
                                    item={todo}
                                />
                            })}
                        </View>
                    )
                )
            }
            <TouchableOpacity
                style={styles.fabContainer}
                activeOpacity={0.7}
                onPress={() => setShowAddTodoPopup(true)}>
                <Icon 
                    name='add'
                    size={35}
                    color={Colors.WHITE}
                />
            </TouchableOpacity>
            {showAddTodoPopup && 
                <AddEditPopup
                    title={ADD}
                    callback={addTodoHandler}
                />}
            {showEditTodoPopup && 
                <AddEditPopup
                    title={EDIT}
                    item={currentTodo}
                    callback={updateTodoHandler}
                />}
            {showFiltersPopup && 
                <FiltersPopup
                    filterType={filter}
                    sortingType={sorting}
                    callback={filtersCallback}
                />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleTextContainer: {
        alignItems: 'flex-start',
        width: Dimensions.get('window').width,
        paddingHorizontal: 20 
    },
    titleText: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: '600',
        color: Colors.TEXT
    },
    fabContainer: { 
        position: 'absolute', 
        bottom: 60, 
        right: 20,
        backgroundColor: Colors.PRIMARY,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 1,
        shadowColor: Colors.SHADOW,
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 0
        },
        shadowRadius: 3,
        elevation: 5
    },
    filterIconContainer: {
        position: 'absolute', 
        top: 75, 
        right: 20,
    },
    todoListContainer: {
        marginTop: 40,
        width: Dimensions.get('window').width,
        paddingHorizontal: 20
    },
    todoItemContainer: {
        paddingHorizontal: 20,
        marginBottom: 15,
        height: 60,
        backgroundColor: Colors.LIGHT,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    todoItemTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    descriptionText: {
        color: Colors.TEXT,
        fontSize: 18
    }
});

export default Home;
