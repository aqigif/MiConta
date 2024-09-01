import Svg, { SvgProps, Path } from 'react-native-svg';

function StarFilled(props: SvgProps) {
	return (
		<Svg width={24} height={24} viewBox="0 0 512 512" {...props}>
			<Path d="m512 198.525-184.083-15.806L256 12.53l-71.917 170.189L0 198.525l139.637 120.988L97.783 499.47 256 404.056l158.217 95.414-41.854-179.957z" />
		</Svg>
	);
}
export default StarFilled;
