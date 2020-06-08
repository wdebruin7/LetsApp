const getActivityDay = (activities, date) => {
  if (!activities) return [];

  const activeDate = new Date(date);
  activeDate.setHours(0, 0, 0, 0);

  return {
    date: activeDate,
    activities: Object.values(activities)
      .filter((activity) => {
        const activityDate = activity.date.toDate();
        activityDate.setHours(0, 0, 0, 0);
        return activeDate.getTime() === activityDate.getTime();
      })
      .sort((a, b) => {
        if (a.group.name < b.group.name) return -1;
        else if (a.group.name > b.group.name) return 1;
        else if (a.uid < b.group.name) return -1;
        else return 0;
      }),
  };
};

export default getActivityDay;
