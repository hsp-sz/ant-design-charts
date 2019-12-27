import React, { useContext, useEffect } from 'react';
import { Gauge, GaugeConfig as G2plotProps } from '@antv/g2plot';
import useChart from '../hooks/useChart';
import { ConfigContext, ErrorBoundary } from '../base';

export interface GaugeConfig extends G2plotProps {
  chartRef?: React.MutableRefObject<Gauge | undefined>;
}

const TechGauge: React.FC<GaugeConfig> = (props: GaugeConfig) => {
  const { chartRef, ...rest } = props;

  const { chart, container } = useChart<Gauge, GaugeConfig>(Gauge, rest);

  useEffect(() => {
    if (chartRef) {
      chartRef.current = chart.current;
    }
  }, [chart.current]);

  return <div ref={container} />;
};

export default (props: GaugeConfig) => {
  const config = useContext(ConfigContext);
  return (
    <ErrorBoundary>
      <TechGauge {...config} {...props} />
    </ErrorBoundary>
  );
};