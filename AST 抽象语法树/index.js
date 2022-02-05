import parse from './parse';

var templateStr = `<div>
				<h3 class="ddd 6777" id="37">你好</h3>
				<ul>
					<li>a</li>
					<li>v</li>
					<li>c</li>
				</ul>		
			</div>`;

const ast = parse(templateStr);
console.log(ast);
