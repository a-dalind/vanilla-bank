import {BaseScreen} from "@/components/BaseScreen/base-screen.component";

export class NotFound extends BaseScreen {
    constructor() {
        super({ title: 'Not found' });
    };

	render () {
		return '<div>NotFound</div>'
	}
}
