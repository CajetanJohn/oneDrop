import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, TouchableWithoutFeedback,
    TextInput, Pressable, StyleSheet, Animated, KeyboardAvoidingView, Platform, Keyboard
} from 'react-native';
import { useTheme } from '../../lib/utils/SetTheme';
import playlistStore from '../../lib/store/playlistStore';
import selectionControl from '../../lib/control/SelectionControl';
import { observer } from 'mobx-react';
import RightArrowIcon from '../../assets/icons/RightArrowIcon';
import { SELECT_AUDIOS, SELECT_PLAYLISTS } from "@env";
import modalStore from '../../lib/control/modalControl';
import { MODAL_TYPE } from '../../lib/constants/Variables';

const PlaylistName = observer(({ onClose }) => {
    const { currentTheme } = useTheme();
    const inputRef = useRef(null);

    const modalVisible = true;
    const tracks = selectionControl.getSelectionData?.itemsSelected || [];

    const [fadeAnim] = useState(new Animated.Value(0));
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    const handleCreate = () => {
        if (!modalStore.getPlaylistName.trim()) {
            return;
        }
        if (tracks.length === 0) {
            modalStore.openModal({
                modalType: MODAL_TYPE.ADDING_AUDIOS_TO_PLAYLIST,
                playlistId:"111",
              })
            return;
        }
        playlistStore.createPlaylist(modalStore.getPlaylistName.trim(), tracks);
        onClose();
    };

    const addToExisting = () => {
        modalStore.openModal({
            modalType: MODAL_TYPE.CHOOSING_SPECIFIC_PLAYLIST_TO_ADD_SELECTED_AUDIOS_TO,
            playlistId:"111",
          })
        
        // Add logic to handle adding to an existing playlist
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0);
            onClose();
        });

        if (modalVisible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.focus();
                }
            }, 100);

            return () => {
                keyboardDidShowListener.remove();
                keyboardDidHideListener.remove();
            };
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [modalVisible, fadeAnim]);

    return (
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.modalContent, {
                        backgroundColor: currentTheme.tertiaryBackground,
                        opacity: fadeAnim,
                        shadowColor: currentTheme.shadowColor,
                        bottom: keyboardHeight,
                    }]}>
                        {tracks.length > 0 && (
                            <Pressable onPress={addToExisting} style={styles.existingPlaylistContainer}>
                                <Text style={[styles.existingPlaylistText, { color: currentTheme.textColor }]}>Add to existing playlist</Text>
                                <RightArrowIcon size={20} color={currentTheme.iconColor} />
                            </Pressable>
                        )}

                        <TextInput
                            ref={inputRef}
                            style={[styles.input, { borderColor: currentTheme.fadedColor, color: currentTheme.textColor }]}
                            placeholder="Playlist Name"
                            placeholderTextColor={currentTheme.textColor}
                            value={modalStore.getPlaylistName}
                            onChangeText={(value) => modalStore.setPlaylistName(value)}
                            selectTextOnFocus={true}
                        />

                        <View style={styles.inputButtons}>
                            <Pressable onPress={onClose} style={[styles.button]}>
                                <Text style={[styles.buttonText, { color: currentTheme.textColor, fontSize: currentTheme.smallFont }]}>CANCEL</Text>
                            </Pressable>
                            <View style={[styles.divider, { backgroundColor: currentTheme.dividerColor }]} />
                            <Pressable onPress={handleCreate} style={[styles.button]}>
                                <Text style={[styles.buttonText, { color: currentTheme.textColor, fontSize: currentTheme.smallFont }]}>CREATE</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default PlaylistName;

const styles = StyleSheet.create({
    modalContent: {
        width: '97%',
        padding: 20,
        borderRadius: 20,
        position: 'absolute',
        bottom: 0,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        overflow: 'hidden',
        marginBottom: 20,
        marginHorizontal: 5,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
    inputButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    existingPlaylistContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
    existingPlaylistText: {
        fontSize: 16,
        marginRight: 5,
    },
    button: {
        padding: 10,
        backgroundColor: 'transparent',
        elevation: 0,
        borderWidth: 0,
    },
    buttonText: {
        fontSize: 16,
    },
    divider: {
        width: 2,
        height: '60%',
    },
});
