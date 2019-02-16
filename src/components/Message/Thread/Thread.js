import React, { PropTypes } from 'react';
import { TouchableWithoutFeedback, TouchableOpacity, View, Image } from 'react-native';
import { HexagonImage } from 'AppComponents';
import { AUX_TEXT, YELLOW } from 'AppColors';
import { LabelText } from 'AppFonts';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
export const Thread = ({
  involvedArray,
  updatedAt,
  lastMessage,
  routeMessages,
  readThread,
  selectMode,
  isSelected
}) => {
  const avatar = involvedArray.length === 1 ? { uri: involvedArray[0].avatarUrl }
    : require('img/icons/icon_logo.png');
  const imageWidth = involvedArray.length === 1 ? 45 : 39;
  const imageHeight = involvedArray.length === 1 ? 45 : 40;
  const color = readThread ? { color: AUX_TEXT } : null;
  const optionColor = isSelected ? { backgroundColor: YELLOW } : null;
  return (
    <TouchableWithoutFeedback
      onPress={routeMessages}
      style={[styles.container, styles.row]}
    >
      <View style={[styles.container, styles.row]}>
        {selectMode &&
          <View style={styles.optionContainer}>
            <View style={[styles.optionSelect, optionColor]} />
          </View>
        }
        <View style={[styles.container, styles.row, { flex: 1 }]}>
          <View style={ styles.readIndicatorView }>
            {!readThread && <View style={styles.readIndicator} />}
          </View>
          <View style={[styles.container, styles.row, styles.threadContainer]}>
            <TouchableOpacity>
              <HexagonImage
                imageWidth={imageWidth}
                imageHeight={imageHeight}
                border={true}
                isHorizontal={true}
                size={40}
                imageSource={avatar}
              />
            </TouchableOpacity>
            <View style={styles.wrap}>
              <View style={[styles.row]}>
                <LabelText style={styles.participants} fontSize={12}>
                  {involvedArray.map((involved, index) => {
                    let name = involved.name;
                    if (involvedArray.length >= 3) {
                      name = involved.name.split(' ')[0];
                    }
                    return (
                      <LabelText key={index}>
                        {name}
                        {index !== involvedArray.length - 1 ? (<LabelText>, </LabelText>) : null}
                      </LabelText>
                    );
                  })}
                </LabelText>
                <LabelText style={styles.updatedAt}>{updatedAt}</LabelText>
              </View>
              <View style={[styles.row, { flex: 1, marginTop: 3 }]}>
                <View style={ styles.lastMessageView }>
                  <LabelText style={[styles.lastMessage, color]} fontSize={12} numberOfLines={3}>
                    {lastMessage}
                  </LabelText>
                </View>
                <View style={styles.nextIconContainer}>
                  <Image source={require('img/icons/icon_back.png')} style={styles.iconForward} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

Thread.propTypes = {
  involvedArray: PropTypes.array.isRequired,
  updatedAt: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  routeMessages: PropTypes.func.isRequired,
  deleteThread: PropTypes.func.isRequired,
  readThread: PropTypes.bool.isRequired,
  selectMode: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool,
};
