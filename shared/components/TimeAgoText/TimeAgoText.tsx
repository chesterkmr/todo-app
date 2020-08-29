import * as React from "react";
import ta from "time-ago";
import { calculateTimeDifFromToNow } from "utils/calculateTimeDifFromToNow";

interface Props {
  refreshRateInMs: number;
  timestamp: number;
}

export function TimeAgoText(props: Props) {
  const { timestamp, refreshRateInMs } = props;

  const [timeAgoText, setTimeAgoText] = React.useState<string>("");

  const refreshTimeAgoText = React.useCallback(() => {
    const currentDate = new Date();
    const timeAgoText = ta.ago(
      +currentDate - calculateTimeDifFromToNow(timestamp, +currentDate)
    );

    setTimeAgoText(timeAgoText);
  }, []);

  React.useEffect(
    (() => {
      let timer: any = null;

      return () => {
        timer = setInterval(refreshTimeAgoText, refreshRateInMs);

        return () => {
          clearInterval(timer);
        };
      };
    })(),
    []
  );

  return <>{timeAgoText || "Just now..."}</>;
}
