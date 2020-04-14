import firestore from '@react-native-firebase/firestore';

const getActivities = (onSnapshot, groups) => {
    // groups === [{description, id}, ...]

    const snapshotListeners = [];
    const groupIDs = groups.map((x) => x.groupDocumentID);

    for (let i = 0; i < groupIDs.length; i += 10) {
        const ref = firestore()
            .collection('activities')
            .where('groupDocumentID', 'in', groupIDs.slice(i, i + 10));

        const unsubscriber = ref.onSnapshot(onSnapshot);
        snapshotListeners.push(() => unsubscriber());
    }
    return () => {
        snapshotListeners.forEach((unsubscriber) => unsubscriber());
    };
};

const getGroups = async () => { };

export { getActivities, getGroups };
