const getActivityDays = (activities) => {
  if (!activities) return [];

  const activityDays = [];
  let remainingActivities = Object.values(activities);

  while (remainingActivities.length > 0) {
    const date = remainingActivities[0].date.toDate();
    const activityDay = {
      date,
      activities: [],
    };

    remainingActivities = remainingActivities.filter((activity) => {
      const activityDate = activity.date.toDate();
      if (date.getTime() === activityDate.getTime()) {
        activityDay.activities.push(activity);
        return false;
      } else return true;
    });

    activityDay.activities.sort((a, b) => {
      if (a.group.name < b.group.name) return -1;
      else if (a.group.name > b.group.name) return 1;
      else if (a.uid < b.group.name) return -1;
      else return 0;
    });

    activityDays.push(activityDay);
  }

  return activityDays.sort((a, b) => {
    if (a.date < b.date) return -1;
    else if (a.date > b.date) return 1;
    else return 0;
  });
};

export default getActivityDays;
