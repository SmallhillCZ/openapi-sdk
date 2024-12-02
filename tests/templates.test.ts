import axios from "axios";
import { expect, MockedFunction, test } from "vitest";
import { Configuration, SDK, TestEnumKeyEnum } from "./sdk";

const configuration = new Configuration({
	basePath: "http://localhost:3000",
});

const api = new SDK(configuration);

(axios.request as MockedFunction<typeof axios.post>).mockResolvedValue(Promise.resolve({ status: 200, data: "OK" }));
test("test basic request", async () => {
	const res = await api.TestApi.test();

	expect(axios.request).toHaveBeenCalledWith({
		headers: {},
		method: "GET",
		url: "http://localhost:3000/api/test",
	});
	expect(res.status).toBe(200);
	expect(res.data).toBe("OK");
});

test("test param in request", async () => {
	const res = await api.TestApi.testParam(10);

	expect(axios.request).toHaveBeenCalledWith({
		headers: {},
		method: "GET",
		url: "http://localhost:3000/api/test-param/10",
	});
});

test("test query in request", async () => {
	expect(TestEnumKeyEnum).toBeDefined();

	const res = await api.TestApi.testQuery({
		testEnumKey: TestEnumKeyEnum.Test,
		testKey: 15,
	});

	expect(axios.request).toHaveBeenCalledWith({
		headers: {},
		method: "GET",
		url: "http://localhost:3000/api/test-query?test_key=15&test_enum_key=test",
	});
});
