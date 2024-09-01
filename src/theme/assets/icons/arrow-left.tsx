import Svg, { SvgProps, Path } from 'react-native-svg';

function ArrowLeft(props: SvgProps) {
	return (
		<Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
			<Path
				fill="#1C274C"
				fillRule="evenodd"
				d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
				clipRule="evenodd"
			/>
		</Svg>
	);
}
export default ArrowLeft;