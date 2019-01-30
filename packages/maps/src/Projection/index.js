// simplified version of https://github.com/hshoff/vx/blob/master/packages/vx-geo/src/projections/Projection.js\
import React from "react";
import PropTypes from "prop-types";
import { Group } from "@vx/group";
import { geoAlbersUsa, geoEqualEarth, geoMercator, geoPath } from "d3-geo";

const projectionMapping = {
  mercator: () => geoMercator(),
  albersUsa: () => geoAlbersUsa(),
  equalEarth: () => geoEqualEarth()
};
/**
 * Component for all projections.
 */
class Projection extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Prevent React from re-rendering the Projection on mouse move events
   * Only update when the chart width has changed
   */
  shouldComponentUpdate(nextProps) {
    const { fitSize } = this.props;
    if (fitSize[0][0] !== nextProps.fitSize[0][0]) return true;
    return false;
  }

  render() {
    const {
      data,
      projection,
      projectionFunc,
      pathFunc,
      clipAngle,
      clipExtent,
      scale,
      translate,
      center,
      rotate,
      precision,
      fitExtent,
      fitSize,
      innerRef,
      children,
      ...restProps
    } = this.props;

    const currProjection = projectionMapping[projection]();

    if (clipAngle) currProjection.clipAngle(clipAngle);
    if (clipExtent) currProjection.clipExtent(clipExtent);
    if (scale) currProjection.scale(scale);
    if (translate) currProjection.translate(translate);
    if (center) currProjection.center(center);
    if (rotate) currProjection.rotate(rotate);
    if (precision) currProjection.rotate(precision);
    if (fitExtent) currProjection.fitExtent(...fitExtent);
    if (fitSize) currProjection.fitSize(...fitSize);

    const path = geoPath().projection(currProjection);

    const features = data.map((feature, i) => {
      return {
        feature,
        type: projection,
        projection: currProjection,
        index: i,
        centroid: path.centroid(feature),
        path: path(feature)
      };
    });

    if (children) return children({ path, features });

    return (
      <Group className="vx-geo">
        {features.map((feature, i) => {
          return (
            <g key={`${projection}-${i}`}>
              <path
                className={`vx-geo-${projection}`}
                d={feature.path}
                ref={innerRef && innerRef(feature, i)}
                {...restProps}
              />
            </g>
          );
        })}
        {pathFunc && pathFunc(path)}
        {projectionFunc && projectionFunc(currProjection)}
      </Group>
    );
  }
}

Projection.propTypes = {
  data: PropTypes.array.isRequired,
  projection: PropTypes.oneOf(["mercator", "equalEarth", "albersUsa"]),
  projectionFunc: PropTypes.func,
  pathFunc: PropTypes.func,
  clipAngle: PropTypes.number,
  clipExtent: PropTypes.array,
  scale: PropTypes.number,
  translate: PropTypes.array,
  center: PropTypes.array,
  rotate: PropTypes.array,
  precision: PropTypes.number,
  fitExtent: PropTypes.array,
  fitSize: PropTypes.array,
  innerRef: PropTypes.func,
  children: PropTypes.func
};

Projection.defaultProps = {
  projection: "mercator"
};

export default Projection;
