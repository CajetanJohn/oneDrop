import React, { Component, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import axios from 'axios';

export const StorageContext = createContext();

export class StorageProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
    }

    async componentDidMount() {
        await this.loadAllData();
    }

    // Save data to both state and storage
    saveData = async (name, value) => {
        try {
            this.setState(
                prevState => ({
                    data: { ...prevState.data, [name]: value }
                }),
                async () => {
                    await AsyncStorage.setItem(name, JSON.stringify(value));
                    console.log(`Data saved: ${name}`, value);
                }
            );
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    // Load all data from storage
    loadAllData = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const stores = await AsyncStorage.multiGet(keys);

            const data = stores.reduce((acc, [key, value]) => {
                acc[key] = JSON.parse(value);
                return acc;
            }, {});

            this.setState({ data }, () => {
                console.log("All data loaded:", data);
            });
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    // Retrieve specific data by name
    getData = (name) => {
        const { data } = this.state;
        console.log(`Data retrieved: ${name}`, data[name]);
        return data[name];
    };

    // Delete specific data by name or all data
    deleteData = async (name) => {
        if (name === "ALL") {
            try {
                await AsyncStorage.clear();
                this.setState({ data: {} }, () => {
                    console.log("All data deleted");
                });
            } catch (error) {
                console.error("Error deleting all data:", error);
            }
        } else {
            try {
                await AsyncStorage.removeItem(name);
                this.setState(prevState => {
                    const newData = { ...prevState.data };
                    delete newData[name];
                    return { data: newData };
                }, () => {
                    console.log(`Data deleted: ${name}`);
                });
            } catch (error) {
                console.error(`Error deleting data: ${name}`, error);
            }
        }
    };

    // Backup all data to an API
    backupData = async (url) => {
        const { data } = this.state;
        try {
            //const response = await axios.post(url, data);
            console.log("Backup successful", response.data);
        } catch (error) {
            console.error("Error backing up data:", error);
        }
    };

    render() {
        return (
            <StorageContext.Provider
                value={{
                    data: this.state.data,
                    saveData: this.saveData,
                    getData: this.getData,
                    deleteData: this.deleteData,
                    backupData: this.backupData,
                }}
            >
                {this.props.children}
            </StorageContext.Provider>
        );
    }
}
